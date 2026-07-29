import CourseList from "./CourseList"
import mock from "./coursesMock"
export default function CourseListPage() {
    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope="col">Course info</th>
                        <th scope="col">Category</th>
                        <th scope="col">Level</th>
                        <th scope="col">Price</th>
                        <th  scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <CourseList mock={mock} />
            </table>
            
        </div>

    )
}