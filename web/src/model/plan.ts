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
    subject: string
    catalog: string
    crse_id: number
    acad_prog: string
    acad_plan: string
    plan_descr: string
    acad_sub_plan: string
    req_descr: string
    requirement: string
}