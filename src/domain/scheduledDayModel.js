export class ScheduledDayModel {
    constructor() {
      this.id = 0
      this.day = ''
      this.title = ''
      this.date = ''
    }
  
    static fromJson(scheduledDayJson) {
      const result = Object.assign(new ScheduledDayModel(),
        scheduledDayJson,
        {
          id: (scheduledDayJson.id * 1),
          day: scheduledDayJson.day,
          title: scheduledDayJson.title,
          date: scheduledDayJson.date
        }
      )
      return result
    }
  }
  