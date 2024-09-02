"use client";

import { FormGenerate } from "../components/pages/generate/form-generate"
import { PageIntroduction } from "../components/pages/generate/page-introduction"
import 'primereact/resources/themes/lara-light-indigo/theme.css';



export default function Generate() {
  return (
    <>
      <PageIntroduction />
      <FormGenerate />
    </>
  )
}