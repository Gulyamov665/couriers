import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Modal } from "react-native";
import { useTheme } from "hooks/useTheme";
import { useTheme as usePaperTheme } from "react-native-paper";
import { Menu } from "react-native-paper";
import { CalendarModal } from "./components/CalendarModal";
import { useSelector } from "react-redux";
import { authState } from "@store/slices/auth";
import { useGetCourierStatsQuery } from "@store/services/orders/ordersApi";
import ThemedView from "app/components/ThemedView";

export interface IPeriod {
  value: "today" | "week" | "month" | "period";
  label: "Сегодня" | "Неделя" | "Месяц" | "Период";
}

export const CourierStatsScreen = () => {
  const { theme } = useTheme();
  const { colors } = usePaperTheme();
  const [visible, setVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<IPeriod>({ value: "today", label: "Сегодня" });
  const [range, setRange] = useState<{ startDate: Date | undefined; endDate: Date | undefined }>({
    startDate: undefined,
    endDate: undefined,
  });
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { user } = useSelector(authState);
  const skip = { skip: !user?.user_id };
  const { data, isLoading, refetch } = useGetCourierStatsQuery(
    { id: user?.user_id ?? 0, period: selectedPeriod },
    skip
  );

  if (!data) return;
  const handleSelect = (value: IPeriod) => {
    setSelectedPeriod(value);
    setRange({ startDate: undefined, endDate: undefined });
    closeMenu();
  };

  const deliveryProgress = data?.stats.today.deliveries / data.stats.today.goal;
  const deliveryPercent = Math.round(deliveryProgress * 100);

  const onDayPress = (day: any) => {
    const date = day.dateString;

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (date < startDate) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const getMarkedDates = () => {
    if (!startDate) return {};

    let marked: Record<string, any> = {
      [startDate]: { startingDay: true, color: "#34C759", textColor: "white" },
    };

    if (endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const current = new Date(start);

      while (current <= end) {
        const dateStr = current.toISOString().split("T")[0];
        if (dateStr !== startDate && dateStr !== endDate) {
          marked[dateStr] = { color: "#bdecc1", textColor: "black" };
        }
        current.setDate(current.getDate() + 1);
      }

      marked[endDate] = { endingDay: true, color: "#34C759", textColor: "white" };
    }

    return marked;
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <CalendarModal
        visible={open}
        onCancel={() => {
          setOpen(false);
          setStartDate(null);
          setEndDate(null);
        }}
        onApply={() => {
          setOpen(false);
          setRange({
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
          });
          setSelectedPeriod({ value: "period", label: "Период" });
        }}
        onDayPress={onDayPress}
        markedDates={getMarkedDates()}
        theme={theme}
      />

      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Hero зона */}
        <View style={[styles.heroBox, { backgroundColor: colors.primary, paddingTop: 40 }]}>
          <View style={{ alignItems: "flex-start" }}>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              contentStyle={{ backgroundColor: theme.colors.background, borderRadius: 12, marginTop: 8 }}
              anchor={
                <Text onPress={openMenu} style={styles.heroTitle}>
                  {selectedPeriod.label}
                </Text>
              }
            >
              <Menu.Item onPress={() => handleSelect({ value: "today", label: "Сегодня" })} title="Сегодня" />
              <Menu.Item onPress={() => handleSelect({ value: "week", label: "Неделя" })} title="Неделя" />
              <Menu.Item onPress={() => handleSelect({ value: "month", label: "Месяц" })} title="Месяц" />
              <Menu.Item
                onPress={() => {
                  closeMenu();
                  setTimeout(() => setOpen(true), 100); // немного позже, чтобы menu успел закрыться
                }}
                title="Период"
              />
            </Menu>
          </View>
          <Text style={styles.heroEarnings}>{data?.stats.today.earnings.toLocaleString()} сум</Text>
          <View style={styles.heroRow}>
            <Text style={styles.heroSub}>📦 {data?.stats.today.deliveries} заказов</Text>
            <Text style={styles.heroSub}>🕒 {data?.stats.today.time}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              color: theme.colors.onBackground,
              backgroundColor: theme.colors.surface,
              padding: 8,
              borderRadius: 8,
              opacity: range.startDate && range.endDate ? 1 : 0,
            }}
          >
            {range.startDate &&
              range.endDate &&
              `${range.startDate.toLocaleDateString()} - ${range.endDate.toLocaleDateString()}`}
          </Text>
        </View>

        {/* Прогресс */}
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.onBackground }]}>Прогресс</Text>
          <Text style={{ color: colors.onSurface }}>
            {data?.stats.today.deliveries} из {data?.stats.today.goal} заказов
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${deliveryPercent}%`,
                  backgroundColor: colors.primary,
                },
              ]}
            />
          </View>
          <Text style={[styles.progressLabel, { color: colors.onSurface }]}>{deliveryPercent}%</Text>
        </View>

        {/* Сравнение */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.onBackground }]}>Сравнение с вчерашним</Text>
          <Text style={{ color: colors.onSurface }}>
            📈 +{data?.stats.today.deliveries - data?.stats.today.yesterdayDeliveries} заказов
          </Text>
          <Text style={{ color: colors.onSurface }}>
            💵 +{data?.stats.today.earnings - data?.stats.today.yesterdayEarnings} сум
          </Text>
        </View>

        {/* Общая статистика */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.onBackground }]}>Общая статистика</Text>
          <View style={styles.statRow}>
            <Text style={[styles.label, { color: colors.onBackground }]}>Всего заказов</Text>
            <Text style={[styles.value, { color: colors.onBackground }]}>{data?.stats.total.deliveries}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.label, { color: colors.onBackground }]}>Общий доход</Text>
            <Text style={[styles.value, { color: colors.onBackground }]}>
              {data?.stats.total.earnings.toLocaleString()} сум
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.label, { color: colors.onBackground }]}>Среднее время</Text>
            <Text style={[styles.value, { color: colors.onBackground }]}>{data?.stats.total.avgTime}</Text>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroBox: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    paddingTop: 20,
  },
  heroEarnings: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 4,
  },
  heroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  heroSub: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
  },
  card: {
    marginTop: 24,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  progressBar: {
    height: 12,
    backgroundColor: "#ccc",
    borderRadius: 8,
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 8,
  },
  progressLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  label: {
    fontSize: 15,
    opacity: 0.85,
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
  },
});
