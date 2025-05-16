// components/Table.js
const Table = () => {
    // Data untuk tabel
    const data = [
        { id: 1, name: "John Doe", age: 28, email: "johndoe@example.com" },
        { id: 2, name: "Jane Smith", age: 32, email: "janesmith@example.com" },
        { id: 3, name: "Mike Johnson", age: 25, email: "mikejohnson@example.com" },
        { id: 4, name: "Emily Davis", age: 40, email: "emilydavis@example.com" },
    ];

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b text-left bg-gray-100">ID</th>
                        <th className="px-4 py-2 border-b text-left bg-gray-100">Name</th>
                        <th className="px-4 py-2 border-b text-left bg-gray-100">Age</th>
                        <th className="px-4 py-2 border-b text-left bg-gray-100">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border-b">{row.id}</td>
                            <td className="px-4 py-2 border-b">{row.name}</td>
                            <td className="px-4 py-2 border-b">{row.age}</td>
                            <td className="px-4 py-2 border-b">{row.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
