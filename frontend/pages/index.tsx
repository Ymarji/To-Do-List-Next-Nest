import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import styles from '../styles/Home.module.css'
import Todolis from './Todolist'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Script 
        src='https://kit.fontawesome.com/bc68e495f6.js'
        crossOrigin='anonymous'
      ></Script>
      <Todolis name="Youssef"/>
    </div>
  )
}

export default Home
