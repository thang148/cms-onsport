import { Pagination } from "antd"

const MyPagination = ({ page_num, onChange, page_size, count }) => {
  return (
    <div className="flex justify-between mt-4 items-center text-sm">
      <div>Total rows: {count || 0}</div>
      {count > 0 && (
        <Pagination
          className="m-2"
          showSizeChanger
          current={Number(page_num)}
          pageSize={Number(page_size)}
          pageSizeOptions={[10, 20, 40, 50, 100]}
          total={count}
          onChange={onChange}
          defaultCurrent={1}
        />
      )}
    </div>
  )
}
export default MyPagination
