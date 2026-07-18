import type { ReactNode } from 'react'
import type { EditorFile } from './types'

export function CodeFileViewer({
  fileName,
  content,
}: {
  fileName: EditorFile
  content: string
}) {
  let formattedContent = content

  if (fileName === 'package.json') {
    try {
      formattedContent = JSON.stringify(JSON.parse(content), null, 2)
    } catch {
      formattedContent = content
    }
  }

  return (
    <section className="min-h-[calc(100vh-2.75rem)] bg-editor py-3">
      <p className="mb-3 px-5 text-xs text-zinc-500 sm:px-8 lg:px-10">
        KHURSHED.DEV › {fileName}
      </p>

      <div className="overflow-x-auto pb-10 font-mono text-sm leading-6">
        {formattedContent.split('\n').map((line, index) => (
          <div
            key={`${fileName}-${index}`}
            className="flex min-w-max hover:bg-white/[0.025]"
          >
            <span className="w-12 shrink-0 select-none pr-3 text-right text-zinc-600">
              {index + 1}
            </span>

            <code className="whitespace-pre pr-8">
              {highlightLine(line, fileName)}
            </code>
          </div>
        ))}
      </div>
    </section>
  )
}

function highlightLine(line: string, fileName: EditorFile): ReactNode {
  if (!line) {
    return <span> </span>
  }

  if (fileName === '.gitignore') {
    return (
      <span
        className={
          line.trimStart().startsWith('#')
            ? 'text-emerald-500'
            : 'text-zinc-300'
        }
      >
        {line}
      </span>
    )
  }

  if (fileName === '.env.local') {
    if (line.trimStart().startsWith('#')) {
      return <span className="text-emerald-500">{line}</span>
    }

    const separator = line.indexOf('=')

    if (separator >= 0) {
      return (
        <>
          <span className="text-sky-400">
            {line.slice(0, separator)}
          </span>
          <span className="text-zinc-500">=</span>
          <span className="text-orange-300">
            {line.slice(separator + 1)}
          </span>
        </>
      )
    }
  }

  if (fileName === 'package.json') {
    return highlightJsonLine(line)
  }

  if (fileName === 'contact.ts') {
    return highlightTypeScriptLine(line)
  }

  return <span className="text-zinc-300">{line}</span>
}

function highlightJsonLine(line: string): ReactNode {
  const propertyMatch = line.match(/^(\s*)("[^"]+")(\s*:\s*)(.*)$/)

  if (propertyMatch) {
    return (
      <>
        <span>{propertyMatch[1]}</span>
        <span className="text-sky-300">{propertyMatch[2]}</span>
        <span className="text-zinc-500">{propertyMatch[3]}</span>
        {highlightJsonValue(propertyMatch[4])}
      </>
    )
  }

  return <span className="text-zinc-400">{line}</span>
}

function highlightJsonValue(value: string): ReactNode {
  const stringMatch = value.match(/^("[^"]*")(,?)$/)

  if (stringMatch) {
    return (
      <>
        <span className="text-orange-300">{stringMatch[1]}</span>
        <span className="text-zinc-500">{stringMatch[2]}</span>
      </>
    )
  }

  if (/^(true|false|null)(,?)$/.test(value)) {
    const match = value.match(/^(true|false|null)(,?)$/)

    return (
      <>
        <span className="text-blue-400">{match?.[1]}</span>
        <span className="text-zinc-500">{match?.[2]}</span>
      </>
    )
  }

  if (/^\d+(,?)$/.test(value)) {
    const match = value.match(/^(\d+)(,?)$/)

    return (
      <>
        <span className="text-lime-300">{match?.[1]}</span>
        <span className="text-zinc-500">{match?.[2]}</span>
      </>
    )
  }

  return <span className="text-zinc-400">{value}</span>
}

function highlightTypeScriptLine(line: string): ReactNode {
  const trimmed = line.trimStart()
  const indent = line.slice(0, line.length - trimmed.length)

  if (
    trimmed.startsWith('/**') ||
    trimmed.startsWith('*') ||
    trimmed.startsWith('*/') ||
    trimmed.startsWith('//')
  ) {
    return (
      <>
        <span>{indent}</span>
        <span className="text-emerald-500">{trimmed}</span>
      </>
    )
  }

  if (trimmed === '}' || trimmed === '},') {
    return (
      <>
        <span>{indent}</span>
        <span className="text-yellow-300">{trimmed}</span>
      </>
    )
  }

  const exportConstMatch = trimmed.match(
    /^(export)(\s+)(const)(\s+)([A-Za-z_$][\w$]*)(\s*=\s*)(\{)$/
  )

  if (exportConstMatch) {
    return (
      <>
        <span>{indent}</span>
        <span className="text-purple-400">{exportConstMatch[1]}</span>
        <span>{exportConstMatch[2]}</span>
        <span className="text-blue-400">{exportConstMatch[3]}</span>
        <span>{exportConstMatch[4]}</span>
        <span className="text-sky-300">{exportConstMatch[5]}</span>
        <span className="text-zinc-400">{exportConstMatch[6]}</span>
        <span className="text-yellow-300">{exportConstMatch[7]}</span>
      </>
    )
  }

  const exportDefaultMatch = trimmed.match(
    /^(export)(\s+)(default)(\s+)([A-Za-z_$][\w$]*)$/
  )

  if (exportDefaultMatch) {
    return (
      <>
        <span>{indent}</span>
        <span className="text-purple-400">{exportDefaultMatch[1]}</span>
        <span>{exportDefaultMatch[2]}</span>
        <span className="text-blue-400">{exportDefaultMatch[3]}</span>
        <span>{exportDefaultMatch[4]}</span>
        <span className="text-sky-300">{exportDefaultMatch[5]}</span>
      </>
    )
  }

  const propertyMatch = trimmed.match(
    /^([A-Za-z_$][\w$]*)(\s*:\s*)(".*?"|'.*?'|true|false)(,?)$/
  )

  if (propertyMatch) {
    const value = propertyMatch[3]
    const isBoolean = value === 'true' || value === 'false'

    return (
      <>
        <span>{indent}</span>
        <span className="text-sky-300">{propertyMatch[1]}</span>
        <span className="text-zinc-500">{propertyMatch[2]}</span>
        <span className={isBoolean ? 'text-blue-400' : 'text-orange-300'}>
          {value}
        </span>
        <span className="text-zinc-500">{propertyMatch[4]}</span>
      </>
    )
  }

  return <span className="text-zinc-300">{line}</span>
}