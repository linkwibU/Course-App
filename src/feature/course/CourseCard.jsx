import { useState } from "react";
import { createPortal } from 'react-dom';
import CourseFormEdit from "./CourseFormEdit";
import toast from 'react-hot-toast';

export default function CourseCard({ course }) {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [modal, setModal] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [isSubmit, setSubmit] = useState(false);
    const [success, setSuccess] = useState(false);
    async function fetchDelte(course) {
        try {
            setSubmit(true);
            const isConfirm = window.confirm("Are you sure?");
            if (isConfirm) {
                const data = await fetch("https://course365-api.onschoolbootcamp.edu.vn/courses/" + course, {
                    method: "DELETE"
                })
                if (!data.ok) {
                    const errBody = await data.json().catch(() => null);
                    console.log("Chi tiết lỗi từ server:", errBody);
                    throw new Error(errBody?.message || "Server Error");
                }
                console.log("đã xoá khoá học: ", data);
                const courseDelete = await data.json();
                setSelectedCourse(courseDelete);
                setSuccess(true);
                toast.success("Xoá khoá học thành công!");
            }
            return;
        }
        catch (error) {
            console.error(error);
        }
        finally{
            setSubmit(false);
        }
    }
    return (
        <>
            <tbody>
                {course.map((c) => {
                    return (
                        <tr key={c.id}>
                            <td>{c.title}</td>
                            <td>{c.category}</td>
                            <td>{c.level}</td>
                            <td>{c.price}</td>
                            <td>{c.status}</td>
                            <td>
                                <button onClick={() => { setSelectedCourse(c), setModal(true) }}>Edit</button>
                                <button onClick={() => fetchDelte(c.id)} disabled={isSubmit}>{isSubmit ? "Deleting.." : "Delete" }</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            {modal && createPortal(<CourseFormEdit course={selectedCourse} onClose={() => setModal(false)} />, document.body)}

        
        </>
    );
}