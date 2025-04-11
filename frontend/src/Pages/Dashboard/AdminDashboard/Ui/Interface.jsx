import React from 'react'
import { VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

function Interface() {
  return (
    <VStack
         align="stretch"
         spacing={4}
         mt={0}
         bg="white"
         shadow="sm"
         rounded="md"
         textAlign={"center"}
         className="border border-gray-200"
       >
         <Outlet />
       </VStack>
  )
}

export default Interface