import { useEffect, useState } from "react"
import CourseList from "./CourseList"
import CourseFormCreate from "./CourseFormCreate";
import search from "../../assets/search.svg";
import { categories, level } from "./coursesMock";
import useCourse from "../../hooks/useCourse";
export default function CourseListPage() {
    const { course, loading, error, fetchCourse, setCourse } = useCourse()
    const [searchText, setSearchText] = useState("");
    const [filterCategory, setFilterCategory] = useState("All Category");
    const [filterLevel, setFilterLevel] = useState("All Level");
    const [totalCourses, setTotal] = useState();
    const [active, setActive] = useState("Active");
    const [draft, setDraft] = useState("Draft");
    const [isAutoRefresh, setisAutoRefresh] = useState(false);


    useEffect(() => {
        if (searchText) {
            document.title = `${searchText}`;
        }
        else {
            document.title = `Course365`;
        }

    }, [searchText]);
    useEffect(() => {
        fetchCourse();
        console.log("component mount");
    }, []);
    useEffect(() => {
        if (isAutoRefresh === false) {
            return;
        }
        else if (isAutoRefresh === true) {
            const interval = setInterval(() => {
                fetchCourse();
                console.log("Auto refresh at", new Date());
            }, 3000);
            return () => {
                clearInterval(interval);
                console.log('đã xoá');
            };
            
        }
    }, [isAutoRefresh]);
    const courseFilter = course.filter((c) => {
        const matchSearch = c.title?.toLowerCase().includes(searchText.toLocaleLowerCase());
        const matchCategory = filterCategory === "All Category" || c.category === filterCategory;

        const matchLevel = filterLevel === "All Level" || c.level === filterLevel;
        return matchSearch && matchCategory && matchLevel;
    })
    function handleFilter() {
        if (courseFilter.length === 0) {
            return <p style={{ color: 'brown', fontSize: '2em' }}>Chưa có khoá học nào</p>
        }


    }

    const total = course.length;

    const PublishTotal = (course.filter(c => c.status === "published")).length;
    const DraftTotal = (course.filter(c => c.status === "draft")).length;

    function handleCourseCreated(newCourse) {
        setCourse(prev => [newCourse, ...prev]);
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


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'baseline' }}>
                <div>
                    <img src={search} />
                    <input
                        type="text" placeholder="Tìm kiếm"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <div>
                    <label>Auto refresh</label>
                    <input
                        type="checkbox"
                        checked={isAutoRefresh}
                        onChange={(e) => setisAutoRefresh(e.target.checked)}
                    />
                </div>

                <select onChange={(e) => { setFilterCategory(e.target.value) }}>
                    {categories.map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                    ))}
                </select>

                <select onChange={(e) => { setFilterLevel(e.target.value) }}>
                    {level.map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                    ))}
                </select>
                <div style={{ display: 'flex', gap: '4px' }}>
                    <label>Total:</label>
                    <div >{total}</div>
                </div>

                <div style={{ display: 'flex', gap: '4px' }}>
                    <label>Publish:</label>
                    <div >{PublishTotal}</div>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                    <label>Draft:</label>
                    <div >{DraftTotal}</div>
                </div>
            </div>
            <div>{dieuKien()}</div>
            <div>{handleFilter()}</div>
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
                <CourseList course={courseFilter} />
            </table>
            <CourseFormCreate handleCourseCreated={handleCourseCreated} />
        </div>

    )
}