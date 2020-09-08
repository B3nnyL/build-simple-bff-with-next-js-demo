import Head from 'next/head'
import styles from '../styles/Home.module.css'


const Home = ({data}) => {
  const renderList = data.comments.map(comment => 
      (
        <li key={comment.id}>
          <h4>{comment.name}</h4>
          <p>{comment.body}</p>
        </li>
      )
  )
  
  return(
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className = "image-post">
          <div className="image">
            <img src={data.imgUrl} alt="post" width="250" /> 
          </div>
          <div className="post">
            <div className="post__content">
              <h3>{data.post}</h3>
            </div>
            <div className="post__comment">
              <ul>
                {renderList}
              </ul>
            </div>
          </div>
        </section>
      </main>

      </div>
  )}


export async function getServerSideProps() {

  const res = await fetch(`http://localhost:3000/api/instacat-bff?postId=1`)
  const data = await res.json()

  return { props: { data } }
}

export default Home