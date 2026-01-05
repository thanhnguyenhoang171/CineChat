package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// 1. Định nghĩa Struct với JSON Tags
// Chú ý: Tên trường PHẢI viết hoa (Exported) thì thư viện json mới đọc được.
type Engineer struct {
	Name   string   `json:"full_name"` // Đổi tên key thành snake_case
	Age    int      `json:"age"`       // Giữ nguyên tên nhưng viết thường
	Skills []string `json:"skills"`    // Slice (mảng động) string
}

func engineerHandler(w http.ResponseWriter, r *http.Request) {
	// Giả lập dữ liệu lấy từ DB
	me := Engineer{
		Name:   "Fullstack Dev",
		Age:    25,
		Skills: []string{"Node.js", "Java", "Golang"},
	}

	// 2. Set Header để client biết đây là JSON
	w.Header().Set("Content-Type", "application/json")

	// 3. Encode struct thành JSON và gửi thẳng vào ResponseWriter (w)
	// NewEncoder giúp ghi dữ liệu trực tiếp ra luồng (stream), tối ưu hơn Marshal
	err := json.NewEncoder(w).Encode(me)
	
	if err != nil {
		http.Error(w, "Lỗi server", http.StatusInternalServerError)
	}
}

func main() {
	http.HandleFunc("/api/me", engineerHandler)

	fmt.Println("Server đang chạy tại http://localhost:8089/api/me")
	http.ListenAndServe(":8089", nil)
}