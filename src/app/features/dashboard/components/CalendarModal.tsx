import React from "react";
import { View, StyleSheet, Modal, Text } from "react-native";
import { Button } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import { Theme } from "app/styles/theme";
import type { DateData } from "react-native-calendars"; // тип даты для onDayPress

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
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent={true}
      presentationStyle="overFullScreen"
    >
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
              todayTextColor: theme.colors.primary, // исправлено
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
              <Text style={{ color: theme.colors.onBackground }}>Отмена</Text>
            </Button>
            <Button mode="outlined" onPress={onApply}>
              <Text style={{ color: theme.colors.onBackground }}>Применить</Text>
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
  },
  calendarBox: {
    borderRadius: 12,
    padding: 16,
    width: 340,
    elevation: 5,
  },
});
