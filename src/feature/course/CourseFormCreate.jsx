import { useState } from "react";

export default function CourseFormCreate() {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        level: "",
        price: '',
        status: ""
    })
    const [errorName, setErrorName] = useState(null);
    const [errorPrice, setErrorPrice] = useState(null);
    const [error, setError] = useState(null);
    function handleChange(field, value) {
        setFormData(prev => ({
            ...prev, [field]: value
        }))
    }
    function handleSubmit(e) {
        e.preventDefault(); // tránh reload trang
        if (!validateForm()) return; // dừng lại nếu có lỗi

        console.log("Dữ liệu hợp lệ, gửi lên API:", formData);
    }
    function validateForm() {
        let isValid = true;
        if (formData.price < 0) {
            setErrorPrice("giá tiền không hợp lệ");
            isValid = false;
        }
        else if(!formData.price){
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
            {errorName && <div style={{color:'red'}}>{errorName}</div>}
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
                    handleChange("price", e.target.value);
                    setErrorPrice("");
                }}
            />
            {errorPrice && <div style={{color:'red'}}>{errorPrice}</div>}
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
                <option value="active">Active</option>
                <option value="draft">Draft</option>
            </select>
            <div style={{ display: 'flex', gap: '1em' }}>
                <button type="submit" onClick={handleSubmit}>Save</button>
                <button>Cancel</button>
            </div>

        </section>

    )
}