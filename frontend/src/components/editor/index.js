"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
    ClassicEditor,
    Essentials,
    Paragraph,
    Bold,
    Italic
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

export default function Editor({ data, onChange }) {
    return (
        <CKEditor
            editor={ClassicEditor}
            data={data}
            config={{
                licenseKey: "GPL",
                plugins: [
                    Essentials,
                    Paragraph,
                    Bold,
                    Italic
                ],
                toolbar: [
                    "undo",
                    "redo",
                    "|",
                    "bold",
                    "italic"
                ]
            }}
            onChange={(event, editor) => {
                onChange(editor.getData());
            }}
        />
    );
}