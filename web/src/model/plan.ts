// interface defining plan
export interface IPlan {
    // short name
    shortName: string
    // long name
    longName: string
    // course list
    courseList: string[]
}

export interface Course {
    name: string
    requirement: string
}