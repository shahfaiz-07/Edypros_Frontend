import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const TagInput = ({name, label, placeholder, register, errors, setValue}) => {
    const [tags, setTags] = useState([])
    const [currentTag, setCurrentTag] = useState("")
    const {course, editCourse} = useSelector(state => state.course)



    const addTag = (e) => {
        e.preventDefault()
        if(currentTag) {
            setTags((prev) => [...prev, currentTag.trim()]);
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
        if(editCourse) {
            setTags(course?.tags)
            setValue(name, course?.tags);
            console.log(course?.tags)
        }
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
			/>
            <button className="bg-yellow-50 px-3 py-1 rounded font-semibold self-end" onClick={addTag}>
				Add
			</button>
            <div className='flex flex-wrap gap-1'>
            {
                tags?.map( (tag, index) => (
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
