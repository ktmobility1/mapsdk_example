export class Pagination {
  paginationNumbers // 페이지 div
  nextButton // 다음 버튼 div
  prevButton // 이전 버튼 div
  pageCount // 전체 페이지 개수
  currentPage // 현재 페이지
  displayFirstPage //현재 보여지는 페이지 중 첫 페이지
  displayEndPage // 현재 보여지는 페이지 중 마지막 페이지
  paginationLimit = 10 // 현재 보여지는 페이지 개수
  changePageFunc // 페이지 클릭 시 수행할 함수

  constructor(paginationNumbers: HTMLDivElement, nextButton: HTMLDivElement, prevButton: HTMLDivElement, totalPage: number, changePageFunc: Function) {
    this.paginationNumbers = paginationNumbers
    this.nextButton = nextButton
    this.prevButton = prevButton
    this.pageCount = totalPage
    this.currentPage = 1
    this.displayFirstPage = 1
    this.displayEndPage = this.paginationLimit < this.pageCount ? this.paginationLimit : this.pageCount
    this.changePageFunc = (e: any) => changePageFunc(e)
  }

  // 페이징에 페이지 1개 추가
  appendPageNumber = (index: any) => {
    const pageNumber = document.createElement('div')
    pageNumber.className = 'pagination-number'
    pageNumber.innerHTML = index
    pageNumber.setAttribute('page-index', index)
    pageNumber.setAttribute('aria-label', 'Page ' + index)
    pageNumber.addEventListener('click', () => {
      this.setCurrentPage(index)
    })
    this.paginationNumbers.appendChild(pageNumber)
  }

  // 페이징에 페이지 추가
  getPaginationNumbers = () => {
    document.querySelectorAll('.pagination-number').forEach((button) => {
      button.remove()
    })
    for (let i = this.displayFirstPage; i <= this.displayEndPage; i++) {
      this.appendPageNumber(i)
    }
  }

  // 페이지 active 시키기
  handleActivePageNumber = () => {
    document.querySelectorAll('.pagination-number').forEach((button) => {
      button.classList.remove('active')
      const pageIndex = Number(button.getAttribute('page-index'))
      if (pageIndex == this.currentPage) {
        button.classList.add('active')
      }
    })
  }

  // 페이지 클릭 시 셋팅
  setCurrentPage = (pageNum: number) => {
    this.currentPage = pageNum
    this.handleActivePageNumber()
    this.changePageFunc(pageNum)
  }

  // 페이징 만들기
  // 객체 생성 후 해당 메소드만 호출하면 됩니다
  makePagination = () => {
    this.getPaginationNumbers()
    this.setCurrentPage(1)

    // 이전 버튼에 클릭 이벤트 추가
    this.prevButton.addEventListener('click', () => {
      if (this.displayFirstPage - this.paginationLimit > 0) {
        this.displayFirstPage -= this.paginationLimit
        this.displayEndPage = this.displayFirstPage + this.paginationLimit - 1
        this.getPaginationNumbers()
      }
      this.setCurrentPage(this.displayFirstPage)
    })

    // 다음 버튼에 클릭 이벤트 추가
    this.nextButton.addEventListener('click', () => {
      if (this.displayFirstPage + this.paginationLimit < this.pageCount) {
        this.displayFirstPage += this.paginationLimit
        this.displayEndPage = this.displayEndPage + this.paginationLimit < this.pageCount ? this.displayEndPage + this.paginationLimit : this.pageCount
        this.getPaginationNumbers()
      }
      this.setCurrentPage(this.displayFirstPage)
    })
  }
}
