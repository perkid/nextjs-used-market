'use client'
import { BsCarFrontFill } from 'react-icons/bs'
import { GiVacuumCleaner, GiLips } from 'react-icons/gi'
import { BiBed } from 'react-icons/bi'
import { GrPersonalComputer } from 'react-icons/gr'
import { MdOutlineSportsTennis } from 'react-icons/md'
import { ImWoman, ImMan } from 'react-icons/im'
import { useSearchParams } from 'next/navigation'
import CategoryBox from './CategoryBox'

export const categories = [
  {
    label: '디지털기기',
    path: 'digital',
    icon: GrPersonalComputer,
    description: '디지털기기 카테고리입니다.'
  },
  {
    label: '생활가전',
    path: 'appliances',
    icon: GiVacuumCleaner,
    description: '생활가전 카테고리입니다.'
  },
  {
    label: '가구/인테리어',
    path: 'interior',
    icon: BiBed,
    description: '가구/인테리어 카테고리입니다.'
  },
  {
    label: '여성의류',
    path: 'women-clothing',
    icon: ImWoman,
    description: '여성의류 카테고리입니다.'
  },
  {
    label: '남성패션/잡화',
    path: 'men-fashion',
    icon: ImMan,
    description: '남성패션/잡화 카테고리입니다.'
  },
  {
    label: '뷰티/미용',
    path: 'beauty',
    icon: GiLips,
    description: '뷰티/미용 카테고리입니다.'
  },
  {
    label: '스포츠/레져',
    path: 'sports',
    icon: MdOutlineSportsTennis,
    description: '스포츠/레져 카테고리입니다.'
  },
  {
    label: '중고차',
    path: 'used-car',
    icon: BsCarFrontFill,
    description: '중고차 카테고리입니다.'
  },
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');

  return (
    <div
      className='flex flex-row items-center justify-between pt-4 overflow-x-auto'
    >
      {
        categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            path={item.path}
            icon={item.icon}
            selected={category === item.path}
          />
        ))
      }
    </div>
  )
}

export default Categories