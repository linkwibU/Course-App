import { useState } from "react";

export default function useCourse() {
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [saving, setSaving] = useState(false);
    async function fetchCourse() {
        try {
            setLoading(true);
            const data = await fetch("https://course365-api.onschoolbootcamp.edu.vn/courses", {
                method: "GET",

            })

            if (!data.ok) {
                throw new Error("Server Error");
            }
            const courseData = await data.json();

            console.log(courseData);
            setCourse(courseData);
            setLoading(false);
        }
        catch (error) {
            setError(error)
            setLoading(false);
        }

    }
    async function createCourse(coursesNew) {
        try {
            setIsSubmitting(true);
            const data = await fetch("https://course365-api.onschoolbootcamp.edu.vn/courses", {
                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },
                body: JSON.stringify(coursesNew)
            })
            if (!data.ok) {
                const errBody = await data.json().catch(() => null);
                console.log("Chi tiết lỗi từ server:", errBody);
                throw new Error(errBody?.message || "Server Error");
            }
            console.log("data khoa hoc: ", data);
            const courseData = await data.json();

            setCourse(prev => [...prev, coursesNew]);
            return { success: true, data: courseData };


        }
        catch (err) {
            console.error(err.message);

            setError("Vui lòng thử lại");
            return { success: false, error: "Vui lòng thử lại" };
        }
        finally {
            setIsSubmitting(false);
        }


    }
    // edit course
    async function fetchCourseId(id) {

        try {
            setIsSubmitting(true);
            const data = await fetch("https://course365-api.onschoolbootcamp.edu.vn/courses/" + id, {
                method: "GET",

            })
            if (!data.ok) {
                const errBody = await data.json().catch(() => null);
                console.log("Chi tiết lỗi từ server:", errBody);
                throw new Error(errBody?.message || "Server Error");
            }
            console.log("data khoa hoc: ", data);
            const courseData = await data.json();
            return courseData;

        }
        catch (error) {
            console.error(error);

            setError("Vui lòng thử lại");
        }
        finally {
            setIsSubmitting(false);
        }
    }
    async function edit(id, courseEdit) {
        try {
            setIsSubmitting(true);
            setSaving(true);

            const data = await fetch("https://course365-api.onschoolbootcamp.edu.vn/courses/" + id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(courseEdit)
            })
            if (!data.ok) {
                const errBody = await data.json().catch(() => null);
                console.log("Chi tiết lỗi từ server:", errBody);
                throw new Error(errBody?.message || "Server Error");
            }
            console.log("đã lưu: ", data);
            setCourse(prev => prev.map(c => c.id === id ? courseEdit : c)); // cập nhật đúng item trong mảng
            return { success: true, data: courseEdit};


        }
        catch (error) {
            console.log(error);
            setError("chưa lưu được");
            return { success: false, error: "chưa lưu được" };
        }
        finally {
            setSaving(false);
            setIsSubmitting(false);
        }
    }
    return { course, loading, error, fetchCourse, setCourse, createCourse, isSubmitting, fetchCourseId, edit };
}