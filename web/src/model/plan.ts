// interface defining plan
export interface IPlan {
    // short name
    shortName: string
    // long name
    longName: string
    // course list
    courseList: Course[]
}

export interface Course {
    name: string
    requirement: string
}