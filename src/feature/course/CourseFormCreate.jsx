import { useState } from "react";
import useCourse from "../../hooks/useCourse";
export default function CourseFormCreate() {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        level: "",
        price: '',
        status: ""
    })
    const {createCourse, isSubmitting} = useCourse()
    const [errorName, setErrorName] = useState(null);
    const [errorPrice, setErrorPrice] = useState(null);
    const [error, setError] = useState(null);
    // const [isSubmitting, setIsSubmitting] = useState(false);
    function handleChange(field, value) {
        setFormData(prev => ({
            ...prev, [field]: value
        }))
    }
    async function handleSubmit(e) {
        e.preventDefault(); // tránh reload trang
        if (!validateForm()) return; // dừng lại nếu có lỗi
        console.log("Dữ liệu hợp lệ, gửi lên API:", formData);

        // try {
        //     setIsSubmitting(true);
        //     const data = await fetch("https://course365-api.onschoolbootcamp.edu.vn/courses", {
        //         method: "POST",

        //         headers: {

        //             "Content-Type": "application/json"

        //         },
        //         body: JSON.stringify(formData)
        //     })
        //     if (!data.ok) {
        //         const errBody = await data.json().catch(() => null);
        //         console.log("Chi tiết lỗi từ server:", errBody);
        //         throw new Error(errBody?.message || "Server Error");
        //     }
        //     console.log("data khoa hoc: ", data);
        //     const courseData = await data.json();
        //     handleCourseCreated(courseData);
        //     setFormData({
        //         title: "",
        //         category: "",
        //         level: "",
        //         price: '',
        //         status: ""
        //     });

        // }
        // catch (err) {
        //     console.error(err.message);

        //     setError("Vui lòng thử lại");
        // }
        // finally{
        //     setIsSubmitting(false);
        // }
        const result = await createCourse(formData);
        if (result.success) {
            setFormData({ title: "", category: "", level: "", price: '', status: "" });
        } else {
            setError(result.error);
            
        }
    }
    function validateForm() {
        let isValid = true;
        if (formData.price < 0) {
            setErrorPrice("giá tiền không hợp lệ");
            isValid = false;
        }
        else if (!formData.price) {
            setErrorPrice("vui lòng điền giá tiền");
            isValid = false;
        }
        if (!formData.title.trim()) {
            setErrorName("vui lòng điền tên");
            isValid = false;
        }
        return isValid;

    }
    return (
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {error && <p>{error}</p>}
            <h1
                style={{ fontSize: '2rem' }}
            >Add NewCourse</h1>

            <label
                style={{ width: '30em' }}
            >Title</label>

            <input
                style={{ width: '30em' }}
                type="text"
                value={formData.title}
                onChange={(e) => {
                    handleChange("title", e.target.value);
                    setErrorName("");
                }}
            />
            {errorName && <div style={{ color: 'red' }}>{errorName}</div>}
            <label
                style={{ width: '30em' }}
            >Category</label>

            <select
                style={{ width: '30em' }}
                value={formData.category}
                onChange={(e) => {
                    handleChange("category", e.target.value);
                    { }
                }}
            >
                <option value="">chọn category</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
            </select>

            <label
                style={{ width: '30em' }}
            >Level</label>

            <select
                style={{ width: '30em' }}
                value={formData.level}
                onChange={(e) => {
                    handleChange("level", e.target.value);
                }}
            >
                <option value="all">Chọn level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
            </select>

            <label
                style={{ width: '30em' }}
            >Price</label>

            <input
                style={{ width: '30em' }}
                type="number"
                value={formData.price}
                onChange={(e) => {
                    handleChange("price", Number(e.target.value));
                    setErrorPrice("");
                }}
            />
            {errorPrice && <div style={{ color: 'red' }}>{errorPrice}</div>}
            <label
                style={{ width: '30em' }}
            >Status</label>

            <select
                style={{ width: '30em' }}
                value={formData.status}
                onChange={(e) => {
                    handleChange("status", e.target.value);
                }}
            >
                <option value="">chọn trạng thái</option>
                <option value="published">Publish</option>
                <option value="draft">Draft</option>
            </select>
            <div style={{ display: 'flex', gap: '1em' }}>
                <button type="submit" disabled={isSubmitting} onClick={handleSubmit}>
                    {isSubmitting ? "Saving..." : "Save"}
                </button>
                <button>Cancel</button>
            </div>

        </section>

    )
}