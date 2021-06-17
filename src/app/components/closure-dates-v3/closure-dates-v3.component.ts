import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import Holidays from 'date-holidays';

const hd = new Holidays();
const closureDates =
  '01/02/2021,01/03/2021,07/06/2021,09/08/2021,11/22/2021,11/23/2021,12/24/2021';

const currentYear = moment().format('YYYY');
const currentMonth = moment().format('MM');

@Component({
  selector: 'app-closure-dates-v3',
  templateUrl: './closure-dates-v3.component.html',
  styleUrls: ['./closure-dates-v3.component.sass'],
})
export class ClosureDatesV3Component implements OnInit {
  private monthQuarterMap = new Map();
  currentCalendarArray = [] as any;
  calendarArray = [] as any;
  days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  currentYear1;
  month1;

  constructor() {}

  ngOnInit(): void {
    //this.currentCalendarArray = this.buildUI('07', currentYear);
    this.currentCalendarArray = this.buildUI(currentMonth, currentYear);
    this.currentYear1 = currentYear;
    this.month1 = currentMonth;
    console.log(this.currentCalendarArray);
  }

  buildUI(selectedMth, selectedYr) {
    this.monthQuarterMap = this.buildMonth(selectedMth, parseInt(selectedYr));
    this.monthQuarterMap.forEach((value, key) => {
      this.calendarArray.push(
        this.buildMonthArr(key, value.days, value.start, selectedYr)
      );
    });
    return this.calendarArray;
  }

  private buildMonth(selectedMonth, selectedYear) {
    let dateObject = moment().set({
      year: parseInt(selectedYear),
      month: selectedMonth,
    });
    let quarterMap = new Map();

    const curDO = dateObject.format('MM');
    const curDaysInMonth = dateObject.daysInMonth();
    const curStartDay = dateObject.startOf('month').day();

    const nextDO = dateObject.add(1, 'month').format('MM');
    const nextDaysInMonth = dateObject.daysInMonth();
    const nextStartDay = dateObject.startOf('month').day();

    const prevDO = dateObject.subtract(2, 'month').format('MM');
    const prevDaysInMonth = dateObject.daysInMonth();
    const prevStartDay = dateObject.startOf('month').day();

    quarterMap.set(prevDO, { days: prevDaysInMonth, start: prevStartDay });
    quarterMap.set(curDO, { days: curDaysInMonth, start: curStartDay });
    quarterMap.set(nextDO, { days: nextDaysInMonth, start: nextStartDay });

    return quarterMap;
  }

  buildMonthArr(month, numOfDays, startDay, year) {
    let monthArray = [] as any;
    let day = {} as any;
    let noDate = {
      dateKey: '00/00/00',
      dateNumber: '0',
      dayOfWeek: '',
      isSelected: false,
      isPast: false,
      isDefault: false,
    };
    for (let i = 0; i < numOfDays; i++) {
      let dayNumStr = i + 1 < 10 ? '' + (i + 1).toString() : (i + 1).toString();
      let dateNumberStr = dayNumStr.length < 2 ? '0' + dayNumStr : dayNumStr;
      let fullDateStr = month + '/' + dateNumberStr + '/' + year;
      day = {
        dateKey: fullDateStr,
        dateNumber: dayNumStr,
        dayOfWeek: this.getDayOfWeek(fullDateStr),
        isSelected: this.getIsSelected(fullDateStr, closureDates),
        isPast: this.getIsPast(fullDateStr),
        isDefault: this.getIsDefault(fullDateStr),
      };

      monthArray.push(day);
    }
    if (monthArray[0].dateNumber === '1') {
      let numberOfDaysToAdd = startDay;
      for (let k = 0; k < numberOfDaysToAdd; k++) {
        // daySpare = noDate;
        monthArray.unshift(noDate);
      }
    }
    let endMth = 42 - monthArray.length;
    for (let l = 0; l < endMth; l++) {
      monthArray.push(noDate);
    }
    const [list, chunkSize] = [monthArray, 7];
    let newMonthArray = [...Array(Math.ceil(list.length / chunkSize))].map(
      (_) => list.splice(0, chunkSize)
    );

    return newMonthArray;
  }

  private getIsSelected(dateStr, closureDates) {
    const splitCDates = closureDates.split(',');
    return splitCDates.includes(dateStr);
  }

  private getDayOfWeek(dateStr) {
    const date = this.formatDateForMoment(dateStr);
    const myObj = moment(date);
    const dow = myObj.format('ddd');
    return dow;
  }

  private getIsPast(dateStr) {
    const date = this.formatDateForMoment(dateStr);
    const todayDate = moment().format('YYYY-MM-DD');
    const inDate = moment(date);
    const diff = inDate.diff(todayDate);
    return diff > 0 ? false : true;
  }

  private getIsDefault(dateStr) {
    let dOWeek =
      this.getDayOfWeek(dateStr) === 'Sat' ||
      this.getDayOfWeek(dateStr) === 'Sun' ||
      this.getHolidays(dateStr)
        ? true
        : false;
    return dOWeek;
  }
  private formatDateForMoment(dateStr) {
    const subDates = dateStr.split('/');
    return subDates[2] + '-' + subDates[0] + '-' + subDates[1];
  }

  private getHolidays(dateStr) {
    hd.init('US');
    const date = this.formatDateForMoment(dateStr) + ' 00:00:00';
    let isHoliday = hd.isHoliday(date);
    return isHoliday;
  }
}
