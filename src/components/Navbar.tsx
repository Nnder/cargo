"use client"
import { Button } from "@gravity-ui/uikit";
import Link from "next/link";

export default function Navbar() {
  return (
    <div style={{ display: 'flex', width: '200px', justifyContent: 'space-evenly'}}>
        <Link href="/">
            <Button view="action" size="l" >Главная</Button>
        </Link>

        <Link href="/admin">
            <Button view="action" size="l" >admin</Button>
        </Link>
    </div>
  )
}
