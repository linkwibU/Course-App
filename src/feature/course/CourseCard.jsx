import { useState } from "react";
import { createPortal } from 'react-dom';
import CourseFormEdit from "./CourseFormEdit";

export default function CourseCard({ course}) {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [modal, setModal] = useState(false);
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
                                <button onClick={() => {setSelectedCourse(c),setModal(true)}}>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            {modal && createPortal(<CourseFormEdit  course={selectedCourse} onClose={() => setModal(false)} />, document.body)}
            

        </>
    );
}