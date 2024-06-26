"use client"
import { Button } from "@gravity-ui/uikit";
import Link from "next/link";

export default function Navbar() {
  return (
    <div style={{ display: 'flex', width: '200px'}}>
        <Link href="/" style={{marginRight: '16px'}}>
            <Button view="action" size="l" >Главная</Button>
        </Link>

        <Link href="/admin">
            <Button view="action" size="l" >admin</Button>
        </Link>
    </div>
  )
}
