import { useEffect, useState } from "react"

export default function CourseFormEdit({ course, onClose }) {
    const [loading, setLoading] = useState(true);
    const [errorName, setErrorName] = useState(null);
    const [errorPrice, setErrorPrice] = useState(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        level: "",
        price: '',
        status: "",
        // description: '',
        // instructor: '',
        // rating: 0
    })
    function handleChange(field, value) {
        setFormData(prev => ({
            ...prev, [field]: value
        }))
        setIsSubmitting(false);
    }
    async function fetchCourseId() {

        try {
            setIsSubmitting(true);
            const data = await fetch("https://course365-api.onschoolbootcamp.edu.vn/courses/" + course.id, {
                method: "GET",

            })
            if (!data.ok) {
                const errBody = await data.json().catch(() => null);
                console.log("Chi tiết lỗi từ server:", errBody);
                throw new Error(errBody?.message || "Server Error");
            }
            console.log("data khoa hoc: ", data);
            const courseData = await data.json();
                setFormData({
                title: courseData.title ?? "",
                category: courseData.category ?? "",
                level: courseData.level ?? "",
                price: courseData.price ?? "",
                status: courseData.status ?? "",
            });




        }
        catch (error) {
            console.error(error);

            setError("Vui lòng thử lại");
        }
        finally {
            setIsSubmitting(false);
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
    useEffect(() => {
        fetchCourseId();

    }, [course.id])
    // put

    async function handleEdit() {
        if (!validateForm()) return; // dừng lại nếu có lỗi
        console.log("Dữ liệu hợp lệ, gửi lên API:", formData);
        try {
            setIsSubmitting(true);
            setSaving(true);

            const data = await fetch("https://course365-api.onschoolbootcamp.edu.vn/courses/" + course.id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            if (!data.ok) {
                const errBody = await data.json().catch(() => null);
                console.log("Chi tiết lỗi từ server:", errBody);
                throw new Error(errBody?.message || "Server Error");
            }
            console.log("đã lưu: ", data);
            const courseEdit = await data.json();
            
            onClose();


        }
        catch (error) {
            console.log(error);

            setError("chưa lưu được");
        }
        finally {
            setSaving(false);
            setIsSubmitting(false);
        }
    }
    return (

        <div style={{ height: '40em' }}>
            <div>I'm a modal dialog</div>
            <button onClick={onClose}>Close</button>

            {loading && <p>{loading}</p>}
            <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {error && <p>{error}</p>}
                <h1
                    style={{ fontSize: '2rem' }}
                >Edit Course</h1>

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
                    <option value="archived">Archived</option>
                </select>

                <div style={{ display: 'flex', gap: '1em' }}>
                    <button type="submit" disabled={isSubmitting} onClick={handleEdit}>
                        {isSubmitting ? "Editing..." : "Edit"}
                    </button>
                </div>

            </section>





        </div>

    )
}