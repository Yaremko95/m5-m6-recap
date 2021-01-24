


CREATE TABLE IF NOT EXISTS "studentAccount" (
    id serial,
    password bigint NOT NULL,
    email text NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE groups
(
    id serial,
    name text NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE teachers
(
    id serial,
    firstname text NOT NULL,
    lastname text NOT NULL,
    PRIMARY KEY (id)
);



CREATE TABLE students
(
    firstname text NOT NULL,
    id serial NOT NULL,
    lastname text NOT NULL,
    student_acc_id integer NOT NULL,
    group_id integer NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT student_student_acc_fk FOREIGN KEY (student_acc_id)
        REFERENCES public."studentAccount" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT student_group_fk FOREIGN KEY (group_id)
        REFERENCES public.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);


CREATE TABLE classes
(
    id serial,
    name text NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE public.group_classes
(
    group_id integer,
    class_id integer,
    PRIMARY KEY (group_id, class_id),
    CONSTRAINT groups_classes_group_fk FOREIGN KEY (group_id)
        REFERENCES public.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT groups_classes_class_fk FOREIGN KEY (class_id)
        REFERENCES public.classes (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);


CREATE TABLE public.teacher_classes
(
    teacher_id integer,
    class_id integer,
    PRIMARY KEY (teacher_id, class_id),
    CONSTRAINT teacher_classes_teacher_fk FOREIGN KEY (teacher_id)
        REFERENCES public.teachers (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT reacher_classes_classs_fk FOREIGN KEY (class_id)
        REFERENCES public.classes (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);



CREATE TABLE public.exams
(
    id serial,
    mark integer NOT NULL,
    student_id integer NOT NULL,
    teacher_id integer NOT NULL,
    class_id integer NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT exam_student_fk FOREIGN KEY (student_id)
        REFERENCES public.students (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT exam_teacher_fk FOREIGN KEY (teacher_id)
        REFERENCES public.teachers (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT exam_class_fk FOREIGN KEY (class_id)
        REFERENCES public.classes (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
