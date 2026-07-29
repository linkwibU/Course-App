import Layout from "./layout/DasboardLayout";
import CourseListPage from "./feature/course/CourseListPage";
export default function App({children}) {
  return(
    <div>
      <Layout>
        <CourseListPage />
      </Layout>
    </div>
  ) 
}