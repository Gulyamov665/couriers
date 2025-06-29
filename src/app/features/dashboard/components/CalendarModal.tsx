import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Button } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import type { DateData } from "react-native-calendars"; // тип даты для onDayPress
import { Theme } from "app/styles/theme";

/**
 * Пропсы для CalendarModal
 * @param visible - видимость модального окна
 * @param onCancel - обработчик отмены
 * @param onApply - обработчик применения
 * @param onDayPress - обработчик выбора дня (DateData)
 * @param markedDates - объект выделенных дат
 * @param theme - тема приложения
 */
export interface CalendarModalProps {
  visible: boolean;
  onCancel: () => void;
  onApply: () => void;
  onDayPress: (day: DateData) => void;
  markedDates: Record<string, any>;
  theme: Theme;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  visible,
  onCancel,
  onApply,
  onDayPress,
  markedDates,
  theme,
}) => {
  if (!visible) return null;
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={[styles.modalContainer]}>
        <View style={[styles.calendarBox, { backgroundColor: theme.colors.background }]}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={markedDates}
            markingType="period"
            theme={{
              backgroundColor: theme.colors.background,
              calendarBackground: theme.colors.background,
              textSectionTitleColor: "#b6c1cd",
              selectedDayBackgroundColor: "#34C759",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#34C759",
              dayTextColor: theme.colors.onBackground, // исправлено
              textDisabledColor: "#d9e1e8",
              dotColor: "#00adf5",
              arrowColor: "#34C759",
              monthTextColor: theme.colors.onBackground, // исправлено
              textMonthFontWeight: "bold",
              textMonthFontSize: 18,
            }}
          />
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
            <Button mode="outlined" onPress={onCancel}>
              Отмена
            </Button>
            <Button mode="outlined" onPress={onApply}>
              Применить
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    // backgroundColor: "green",
  },
  calendarBox: {
    borderRadius: 12,
    padding: 16,
    width: 340,
    elevation: 5,
  },
});
