import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Users.module.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    active: true,
    fullName: "",
    phone: "",
    address: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  async function fetchUsers(currentPage = 1) {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://127.0.0.1:3001/api/users?page=${currentPage}&limit=${limit}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUsers(res.data.data.users || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function goToPage(newPage) {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  }

  function openEditModal(user) {
    setEditUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      active: user.active,
      fullName: user.fullName || "",
      phone: user.phone || "",
      address: user.address || "",
      password: "",
      passwordConfirm: "",
    });
    setError(null);
    setModalOpen(true);
  }

  function openCreateModal() {
    setEditUser(null);
    setFormData({
      username: "",
      email: "",
      active: true,
      fullName: "",
      phone: "",
      address: "",
      password: "",
      passwordConfirm: "",
    });
    setError(null);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditUser(null);
    setError(null);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function saveEdit() {
    try {
      if (editUser) {
        const updateData = {
          username: formData.username,
          email: formData.email,
          active: formData.active,
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
        };

        const res = await axios.patch(
          `http://127.0.0.1:3001/api/users/${editUser._id}`,
          updateData,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.status === 200) {
          const updatedUser = res.data.data?.data || {
            ...editUser,
            ...updateData,
          };
          setUsers((prev) =>
            prev.map((u) => (u._id === editUser._id ? updatedUser : u))
          );
          closeModal();
        } else {
          setError("Cập nhật thất bại");
        }
      } else {
        // Tạo user mới cần đủ dữ liệu và xác nhận mật khẩu
        const {
          username,
          email,
          password,
          passwordConfirm,
          fullName,
          phone,
          address,
        } = formData;

        if (!username || !email || !password || !passwordConfirm) {
          setError("Vui lòng điền đầy đủ thông tin");
          return;
        }

        if (password !== passwordConfirm) {
          setError("Mật khẩu và xác nhận mật khẩu không khớp");
          return;
        }

        const res = await axios.post(
          "http://127.0.0.1:3001/api/users/signup",
          {
            username,
            email,
            password,
            passwordConfirm,
            fullName,
            phone,
            address,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.status === 201 || res.data.status === "success") {
          setPage(1);
          fetchUsers(1);
          closeModal();
        } else {
          setError("Tạo người dùng thất bại");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi server");
    }
  }

  async function deleteUser(userId) {
    if (!window.confirm("Bạn chắc chắn muốn xóa người dùng này?")) return;

    try {
      const res = await axios.delete(
        `http://127.0.0.1:3001/api/users/${userId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 204 || res.status === 200) {
        fetchUsers(page);
      } else {
        alert("Xóa thất bại");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi server khi xóa");
    }
  }

  const handleResetPassword = async (id) => {
    if (!window.confirm("Bạn có chắc muốn reset mật khẩu user này?")) return;
    try {
      await axios.patch(
        `http://localhost:3001/api/v1/users/${id}/reset-password`
      );
      alert("Đã reset mật khẩu thành công!");
    } catch (err) {
      console.error(err);
      alert("Reset mật khẩu thất bại!");
    }
  };

  if (loading) return <p>Đang tải danh sách người dùng...</p>;

  return (
    <div className={styles.container}>
      <h2>Danh sách Người dùng</h2>
      <button className={styles.createBtn} onClick={openCreateModal}>
        + Tạo người dùng mới
      </button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Username</th>
            <th>Email</th>
            <th>Hoạt động</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                Không có người dùng nào
              </td>
            </tr>
          )}
          {users.map((user, idx) => (
            <tr key={user._id}>
              <td>{(page - 1) * limit + idx + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                {user.active ? (
                  <span className={styles.active}>Hoạt động</span>
                ) : (
                  <span className={styles.inactive}>Không hoạt động</span>
                )}
              </td>
              <td>
                <button
                  className={styles.editBtn}
                  onClick={() => openEditModal(user)}
                >
                  Sửa
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteUser(user._id)}
                >
                  Xóa
                </button>
                <button
                  onClick={() => handleResetPassword(user._id)}
                  className={styles.resetBtn}
                >
                  Reset mật khẩu
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          className={styles.pageBtn}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const pageNumber = i + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              className={`${styles.pageBtn} ${
                pageNumber === page ? styles.activePageBtn : ""
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
          className={styles.pageBtn}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>{editUser ? "Chỉnh sửa người dùng" : "Tạo người dùng mới"}</h3>

            {!editUser ? (
              <>
                <label>
                  Email:
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required
                  />
                </label>
                <label>
                  Username:
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    type="text"
                    required
                  />
                </label>
                <label>
                  Password:
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    required
                    autoComplete="new-password"
                  />
                </label>
                <label>
                  Xác nhận mật khẩu:
                  <input
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    type="password"
                    required
                    autoComplete="new-password"
                  />
                </label>
                <label>
                  Full Name:
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    type="text"
                  />
                </label>
                <label>
                  Phone:
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="text"
                  />
                </label>
                <label>
                  Address:
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    type="text"
                  />
                </label>
              </>
            ) : (
              <>
                <label>
                  Username:
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    type="text"
                  />
                </label>
                <label>
                  Email:
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                  />
                </label>
                <label>
                  Full Name:
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    type="text"
                  />
                </label>
                <label>
                  Phone:
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="text"
                  />
                </label>
                <label>
                  Address:
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    type="text"
                  />
                </label>

                <div className={styles.statusGroup}>
                  <span>Trạng thái hoạt động:</span>
                  <button
                    type="button"
                    className={`${styles.statusBtn} ${
                      formData.active ? styles.activeStatus : ""
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, active: true }))
                    }
                  >
                    Hoạt động
                  </button>
                  <button
                    type="button"
                    className={`${styles.statusBtn} ${
                      !formData.active ? styles.inactiveStatus : ""
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, active: false }))
                    }
                  >
                    Không hoạt động
                  </button>
                </div>
              </>
            )}

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.modalActions}>
              <button className={styles.saveBtn} onClick={saveEdit}>
                {editUser ? "Lưu" : "Tạo"}
              </button>
              <button className={styles.cancelBtn} onClick={closeModal}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
