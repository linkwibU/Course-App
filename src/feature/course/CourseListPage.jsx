import { useEffect, useState } from "react"
import CourseList from "./CourseList"
import CourseFormCreate from "./CourseFormCreate";
export default function CourseListPage() {
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    function handleCourseCreated(newCourse) {
        setCourse(prev => [newCourse, ...prev]);
    }
    function handleCourseUpdated(updatedCourse) {
        setCourse(prev =>
            prev.map(c => (c.id === updatedCourse.id ? updatedCourse : c))
        );
    }
    function dieuKien() {
        if (loading) {
            return <p>Đang load...</p>
        }
        else if (error) {
            return (
                <div>
                    <p>Đang xảy ra lỗi, vui lòng thử lại.</p>
                    <button>Retry</button>
                </div>

            )
        }
        else if (course.length === 0) {
            return (
                <p>Hiện tại chưa có khoá học</p>
            )
        }
        return null;

    }
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
    useEffect(() => {
        fetchCourse();
    }, [])
    return (
        <div>
            <div>{dieuKien()}</div>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope="col">Course info</th>
                        <th scope="col">Category</th>
                        <th scope="col">Level</th>
                        <th scope="col">Price</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <CourseList  course={course} />
            </table>
            <CourseFormCreate handleCourseCreated={handleCourseCreated} />
        </div>

    )
}