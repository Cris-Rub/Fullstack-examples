import React, { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GET_EMPLOYEE } from '../graphql/Queries'
import { REMOVE_EMPLOYEE } from '../graphql/Mutation'
import { Link } from 'react-router-dom'
import { userState } from '../config/UserState'

const Home = () => {
  const[searchEmployee, {data, error}] = useLazyQuery(GET_EMPLOYEE);
  const verifySesion = userState((state) => state.sesion);
  console.log('Sesion from Home: ', verifySesion);
  const [removeEmployee] = useMutation( REMOVE_EMPLOYEE, {
	// QUERY DESPUÉS DE ELIMINAR EMPLEADO EN BASE DE DATOS
	refetchQueries: [{query: GET_EMPLOYEE}]
  });
  useEffect(() => {
    console.log('use effect in home');
    searchEmployee()
  }, [])

  // searchEmployee();
  if(data){
    console.log(data);
  }
  if(error) return <h1>Error: {error}</h1>

  return (
    <div className="flex gap-4 pt-4">
			{data &&
				data.getEmployees.map(({ _id, name, position, code, age }) => (
					<>
					<Link
						to='/create-employee'
						state={{_id, name, code, position, age}}
						className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
						<a href="#">
							<img
								className="rounded-t-lg"
								src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fexplaining%2F&psig=AOvVaw2t0Nyt9UP3GTEVt_UGunvD&ust=1678929084553000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNje3LDg3P0CFQAAAAAdAAAAABAK"
								alt
							/>
						</a>
						<div className="p-5">
							<a href="#">
								<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
									{name}
								</h5>
							</a>
							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
								{position}
                            </p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
								{code}
							</p>
							
						</div>
					</Link>
					<div>
					<button
						onClick={async (e) =>  {
							await removeEmployee({
								variables: {_id}
							});

						}}
						type="button"
						className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Remove</button>
					</div>
					</>
				))}
		</div>
  )
}

export default Home;
