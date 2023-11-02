import { User } from '@prisma/client'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

interface NavItemProps {
  mobile?: boolean;
  currentUser?: User | null;
}
const NavItem = ({ mobile, currentUser }: NavItemProps) => {
  return (
    <ul className={`justify-center flex gap-4 w-full items-center ${mobile && 'flex-col h-full'}`}>
      
      <li className='py-2 text-center border-b-4 cursor-pointer'><Link href={'/admin'}><button>Admin</button></Link></li>
      <li className='py-2 text-center border-b-4 cursor-pointer'><Link href={'/user'}><button>User</button></Link></li>
      <li className='py-2 text-center border-b-4 cursor-pointer'><Link href={'/chat'}><button>Chat</button></Link></li>
      {
        currentUser ?
          <li className='py-2 text-center border-b-4 cursor-pointer'>
            <button onClick={() => signOut()}>SignOut</button>
          </li>
          :
          <li className='py-2 text-center border-b-4 cursor-pointer'>
            <button onClick={() => signIn()}>SignIn</button>
          </li>
      }
    </ul>
  )
}

export default NavItem