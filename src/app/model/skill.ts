export interface Skill{
    id?: number;
    person_id: number;
    type_skill: boolean;   //hard o soft
    percent: number;    
    title: string;
    image_src: string;
    show_image: boolean;
    outer_stroke_color: string;
    inner_stroke_color: string;
    background_color: string;
}