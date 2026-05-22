import styles from "./page.module.css"

const page = async () => {

  const res = await fetch("https://fakestoreapi.com/users/3")
  const user = await res.json();

  if(!user){
    return(
      <div className={styles.user_not}>Profile Not Found</div>
    )
  }

  // if (!res.ok) {
  //   return (
  //     <div className={styles.user_not}>Profile Not Found</div>
  //   )
  // }

  return (
    <div className={styles.div_layout}>
      <div className={styles.div_wrapper}>
        <div className={styles.div_profile}>
          <h2>{user.name.firstname} {user.name.lastname}</h2>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          <p>Phone: {user.phone}</p>
        </div>
        <div className={styles.div_profile}>
          <h2>Address</h2>
          <p>City: {user.address.city};</p>
          <p>Street: {user.address.street} {user.address.number};</p>
          <p>Zipcode: {user.address.zipcode};</p>
        </div>
      </div>
    </div>
  )
}

export default page;