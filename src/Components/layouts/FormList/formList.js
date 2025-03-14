import React, { useEffect, useState } from "react";
import axios from "axios";
import FormItem from "../ContentComponent/FormItem/formItem";
const XLSX = require("xlsx");
const { saveAs } = require("file-saver");

function FormList({ projectId }) {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDeleteForm = async (formId) => {
    try {
      await axios.delete(`http://localhost:5000/items/${formId}`);
      setForms((prevForms) => prevForms.filter((form) => form.id !== formId));
    } catch (err) {
      alert("Lỗi khi xem response: " + err.message);
    }
  };
  const handleResponseForm = async (formId) => {
    try {
      const forms = await axios.get(`http://localhost:5000/items/${formId}`);
      console.log(forms.data);
      window.open(`${forms.data.url}#responses`, "_blank");
    } catch (err) {
      alert("Lỗi khi xem phản hồi: " + err.message);
    }
  };

  const handleExportForm = async (formId) => {
    try {
      console.log("Bắt đầu xuất file, formId:", formId);

      // Gọi API lấy dữ liệu mới
      const response = await fetch(
        `http://localhost:5000/items/${formId}?t=${Date.now()}`
      );
      const data = await response.json();

      console.log("Dữ liệu từ API:", data);

      // Kiểm tra dữ liệu có rỗng không
      if (!data || Object.keys(data).length === 0) {
        alert("Không có dữ liệu để xuất.");
        return;
      }

      // Chuyển Object thành Array để xuất Excel
      const responses = [data];

      console.log("Dữ liệu chuẩn bị ghi vào Excel:", responses);

      // Kiểm tra nếu responses vẫn là dữ liệu cũ
      if (responses[0].id === "1") {
        console.warn("⚠ Cảnh báo: Dữ liệu có vẻ không thay đổi!");
      }

      // Tạo worksheet từ dữ liệu JSON
      const worksheet = XLSX.utils.json_to_sheet(responses);

      // Tạo workbook và thêm sheet vào
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "SurveyResults");

      // Xuất file Excel
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(blob, `SurveyResults_${formId}.xlsx`);

      alert("Xuất file Excel thành công!");
    } catch (error) {
      console.error("Lỗi khi xuất kết quả:", error);
      alert("Không thể xuất kết quả khảo sát.");
    }
  };

  const handleSettingForm = async (formId) => {
    try {
      const forms = await axios.get(`http://localhost:5000/items/${formId}`);
      console.log(forms.data);
      window.open(`${forms.data.url}#settings`, "_blank");
    } catch (err) {
      alert("Lỗi khi sửa form: " + err.message);
    }
  };
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/items?projectId=${projectId}`
        );
        setForms(response.data);
      } catch (err) {
        setError("Lỗi khi lấy danh sách forms");
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [projectId]);

  if (loading) return <p>Đang tải danh sách forms...</p>;
  if (error) return <p>{error}</p>;
  if (forms.length === 0) return <p>Không có forms nào cho dự án này.</p>;

  return (
    <div>
      {forms.map((form) => (
        <FormItem
          key={form.id}
          {...form}
          onDelete={handleDeleteForm}
          onResponse={handleResponseForm}
          onSettingFrom={handleSettingForm}
          onExportForm={handleExportForm}
        />
      ))}
    </div>
  );
}

export default FormList;
