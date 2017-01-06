package hand.zjf.dto;

import java.io.Serializable;
import java.util.List;
public class Page implements Serializable {
	
private static final long serialVersionUID = 5356314552375586366L;
	
	//总计多少条
	private int letterCount;
	//每页多少条
	private int pageSize;
	//总计多少页
	private int pageNum;
	//当前第几页
	private int pageCurrent = 1;
	//开始的位置
	private int pageStart;
	
	private List<?> list;
	
	public Page() {}

	public Page(int pageCurrent,int pageSize) {
		this.pageCurrent = pageCurrent;
		this.pageSize =pageSize;
		this.pageStart = (pageCurrent - 1) * pageSize;
	}

	public int getLetterCount() {
		return letterCount;
	}

	public void setLetterCount(int letterCount) {
		this.letterCount = letterCount;
		
		this.pageNum = (letterCount / this.pageSize) + ((letterCount % this.pageSize) > 0 ? 1 : 0);
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPageNum() {
		return pageNum;
	}

	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}

	public int getPageCurrent() {
		return pageCurrent;
	}

	public void setPageCurrent(int pageCurrent) {
		this.pageCurrent = pageCurrent;
	}
	
	public int getPageStart() {
		return pageStart;
	}

	public void setPageStart(int pageStart) {
		this.pageStart = pageStart;
	}

	public List<?> getList() {
		return list;
	}

	public void setList(List<?> list) {
		this.list = list;
	}

	
	@Override
	public String toString() {
		return "Page [letterCount=" + letterCount + ", pageSize=" + pageSize + ", pageNum=" + pageNum + ", pageCurrent=" + pageCurrent + ", list="
				+ list + "]";
	}
	

}
