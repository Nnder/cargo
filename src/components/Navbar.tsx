"use client"
import Link from "next/link";

//<Button view="action" size="l" >Главная</Button>
//<Button view="action" size="l" >admin</Button>

export default function Navbar() {
  return (
    <div style={{ display: 'flex', width: '200px', justifyContent: 'space-evenly'}}>
        <Link href="/">
            Главная
        </Link>

        <Link href="/admin">
            Admin
        </Link>
    </div>
  )
}
