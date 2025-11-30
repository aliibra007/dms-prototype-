import React, { useState } from 'react'
import { Button, Collapse, Textarea } from '@mantine/core'

const NoteSection = ({ value, onChange }) => {
  const [opened, setOpened] = useState(false)
  return (
    <div className="w-full">
      <div className="rounded-xl border border-gray-200 dark:border-muted-dark bg-white dark:bg-secondary-dark shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Additional Note</h3>
          <Button size="xs" variant="light" onClick={() => setOpened((v) => !v)}>
            {opened ? 'Hide' : 'Add Note'}
          </Button>
        </div>
        <Collapse in={opened} transitionDuration={150}>
          <div className="px-4 pb-4">
            <Textarea
              minRows={4}
              autosize
              placeholder="Provide any helpful context for the doctor (e.g., symptoms, duration, allergies)."
              value={value}
              onChange={(e) => onChange(e.target.value)}
              styles={{ input: { width: '100%' } }}
            />
          </div>
        </Collapse>
      </div>
    </div>
  )
}

export default NoteSection
