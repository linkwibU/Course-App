export default function CourseCard({ mock }) {
    return (
        <tbody>
            {mock.map((c) => {
                return (
                    <tr key={c.id}>
                        <td>{c.title}</td>
                        <td>{c.category}</td>
                        <td>{c.level}</td>
                        <td>{c.price}</td>
                        <td>{c.status}</td>
                        <td>
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                        
                    </tr>
                )
            })}
        </tbody>
    )
}