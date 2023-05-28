export class CourseModel {
    constructor() {
      this.id = 0
      this.name = ''
    }
  
    static fromJson(courseJson) {
      const result = Object.assign(new CourseModel(),
        courseJson,
        {
          id: (courseJson.id * 1),
          name: courseJson.name
        }
      )
      return result
    }
  }
  