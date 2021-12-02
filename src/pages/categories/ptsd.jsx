import { useState } from 'react'
import Link from 'next/link'

import CompsLayout from '@/components/layouts/Layout'
import useThreads from '@/_hooks/threads'
import CompsModalsThreadsCreate from '@/components/modals/threads/create'

export default function PagesCategoriesPTSD() {
  const [openThreadsCreate, setThreadsCreate] = useState(false)
  const [page, setPage] = useState(1)
  const category = 'PTSD'

  const { threads, createThread, meta } = useThreads(page, category)

  const arrayTotalPages = Array.from({ length: meta?.totalPages }, (_, i) => i + 1)

  console.log(threads)
  console.log('>>>>>>meta', meta)
  console.log('>>>>>>page', page)
  console.log('>>>>>>>', arrayTotalPages)

  return (
    <CompsLayout>
      <div id="pages-categories-ptsd" className="pages-categories-show text-center">
        <h1>PTSD</h1>
        <div className="btn-group">
          <button
            className="btn btn-primary btn-sm"
            type="button"
            onClick={() => setThreadsCreate(true)}
          >New Thread</button>
        </div>
      </div>

      <main id="threads-main-group" className="threads-main-group text-center">
        {
          threads?.map((thread) => (
            thread.category === 'PTSD'
            && (
            <div key={thread.id}>
              <Link href={`/threads/${thread.id}`}>
                <a>{thread.title}</a>
              </Link>
            </div>
            )

          ))
        }
      </main>

      <div id="page-btn" className="d-flex justify-content-around">
        {
            page > 1 && <button type="button" className="btn btn-info btn-spacing" onClick={() => setPage(page - 1)}>Previous</button>
          }
        {
            arrayTotalPages?.map((index) => (
              <button type="button" className="btn btn-info" onClick={() => setPage(index)}> {index} </button>
            ))
        }
        {
            true && arrayTotalPages.includes(page) && <button type="button" className="btn btn-info" onClick={() => setPage(page + 1)}>Next</button>
          }
      </div>

      <CompsModalsThreadsCreate
        show={openThreadsCreate}
        handleClose={() => setThreadsCreate(false)}
        handleSubmit={(values) => {
          createThread(values).then(() => {
            setThreadsCreate(false)
          })
        }}
      />
    </CompsLayout>
  )
}
