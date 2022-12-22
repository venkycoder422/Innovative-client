import React from 'react'
import Navbar from '../components/Navbar'
import { Blogs } from './Blogs'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { BackgroundImage } from '../components/BackgroundImg';
import styled from 'styled-components';
export const Home = () => {
  return (
    <Container>
    <Blogs />
    </Container>
  )
}

const Container = styled.div`

`
