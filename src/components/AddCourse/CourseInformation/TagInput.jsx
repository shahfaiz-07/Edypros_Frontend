import React, { useEffect, useState } from 'react'

const TagInput = ({name, label, placeholder, register, errors, setValue}) => {
    const [tags, setTags] = useState([])
    const [currentTag, setCurrentTag] = useState("")

    const addTag = () => {
        if(currentTag) {
            setTags((prev) => [...prev, currentTag]);
            setCurrentTag("")
        }
    }

    const removeTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags)
    }

    useEffect(() => {
		register(name, {
			required: true
		})
	}, [])

    useEffect(() => {
		setValue(name, tags)
	}, [tags, addTag, removeTag])
  return (
    <div className="flex flex-col space-y-2">
			<label className="text-sm text-richblack-5" htmlFor={name}>
				{label}<sup className="text-pink-200">*</sup>
			</label>
			<input
				id={name}
				placeholder={placeholder}
				value={currentTag}
				onChange={(e) => setCurrentTag(e.target.value)}
				className="form-style w-full"
                onKeyUp={(e) => {
                    if(e.key === "Enter")
                    return addTag()
                    else return null
                }}
			/>
            <div className='flex flex-wrap gap-1'>
            {
                tags.map( (tag, index) => (
                    <div key={index} className='bg-yellow-400 rounded-full text-xs py-1 px-2 text-richblack-5'><span className='' index={index}>{tag}</span> <span className='text-yellow-600 hover:text-white cursor-pointer' onClick={()=>removeTag(index)}><i className="ri-close-line"></i></span></div>
                ))
            }
            </div>
			{errors[name] && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
                {label} is required
            </span>
        	)}
		</div>
  )
}

export default TagInput
