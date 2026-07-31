import Layout from "./layout/DasboardLayout";
import CourseListPage from "./feature/course/CourseListPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
export default function App({ children }) {
  return (
    <div>
      <Layout>
        <CourseListPage />
      </Layout>
      <Toaster />
    </div>
  )
}