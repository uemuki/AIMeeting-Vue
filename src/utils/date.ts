export default class DateUtil {
  // greeting: string;
  // constructor(message: string) {
  //   this.greeting = message;
  // }

  formatToLocal(dt: string | number | Date, pattern?: string) {
    const d = this.parseDate(dt);
    const dLocal = d.getTime();
    // const dLocal = d.getTime() + d.getTimezoneOffset() * 60000;
    pattern = pattern || "YYYY-MM-DD hh:mm";
    return this.formatTime(dLocal, pattern);
  }

  formatTime(dt: string | number | Date, pattern: string) {
    const dtT: Date = this.parseDate(dt);
    const year = dtT.getFullYear();
    const month = dtT.getMonth() + 1;
    const day = dtT.getDate();
    const hour = dtT.getHours() + 8;
    const minute = dtT.getMinutes();
    const sec = dtT.getSeconds();

    const h = (v: number) => (v < 10 ? "0" + v : v);
    const map: DateMap = {
      YYYY: year,
      MM: h(month),
      M: month,
      DD: h(day),
      D: day,
      HH: h(hour),
      H: hour,
      hh: h(hour),
      h: hour,
      m: minute,
      mm: h(minute),
      s: sec,
      ss: h(sec)
    };

    pattern = pattern || "YYYY-MM-DD hh:mm";
    return pattern.replace(/[a-zA-Z]+/g, (name: any) => {
      const ret = map[name];
      return ret === undefined ? name : ret;
    });
  }

  parseDate(dt: string | number | Date) {
    if (typeof dt === "string") {
      return this.parseFromString(dt);
    }
    if (typeof dt === "number") {
      return this.parseFromNumber(dt);
    }
    if (typeof dt === "object" && typeof dt.getTime === "function") {
      return dt;
    }
    throw new Error("invalid date");
  }

  parseFromNumber(time: number) {
    const dt = new Date();
    dt.setTime(time);
    return dt;
  }

  parseFromString(str: string) {
    const rDateTime = /((\d{4})-(\d{1,2})-(\d{1,2}))([^\d]+?(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/;
    const m = rDateTime.exec(str);
    if (!m) {
      return new Date("invalid date");
    }
    const dt = new Date();
    if (m[1]) {
      dt.setFullYear(+m[2]);
      dt.setMonth(+m[3] - 1);
      dt.setDate(+m[4]);
    }
    if (m[5]) {
      dt.setHours(+m[6]);
      dt.setMinutes(+m[7]);
      dt.setSeconds(+m[8] || 0);
    }
    return dt;
  }

  compare(dtFir: string | number | Date, dtSec: string | number | Date) {
    const dtFirT = this.parseDate(dtFir);
    const dtSecT = this.parseDate(dtSec);
    return dtFirT > dtSecT;
  }
}

interface DateMap {
  [key: string]: string | number;
  YYYY: string | number;
  MM: string | number;
  M: string | number;
  DD: string | number;
  D: string | number;
  HH: string | number;
  H: string | number;
  hh: string | number;
  h: string | number;
  m: string | number;
  mm: string | number;
  s: string | number;
  ss: string | number;
}
