import fitz  # pip install pymupdf
import re
from typing import Optional, Tuple

def find_page(pdf_path: str, title: str = "service") -> Tuple[Optional[int], Optional[str]]:
    doc = fitz.open(pdf_path)

    for i in range(doc.page_count):
        page = doc.load_page(i)

        raw = page.get_text("text")
        text = raw if isinstance(raw, str) else ""

        if re.search(rf"\b{re.escape(title)}\b", text, flags=re.IGNORECASE):
            return i, text

    return None, None

def get_next_line(text: str | None):
    lines = [ln.strip() for ln in text.splitlines()] if text is not None else []


    title = None
    for i, ln in enumerate(lines):
        if ln.lower() == "services":
            for nxt in lines[i+1:]:
                if nxt:
                    title = nxt
                    break
            break
    
    return title

if __name__ == "__main__":
    pdf_path = "Inteli-K PROP-3358 Inteli-K Test 2.pdf"
    page_index, service_text = find_page(pdf_path, "service")

    if page_index is None:
        print("No page found containing 'Service'")
    else:
        print("Found on page:", page_index + 1)
        print(get_next_line(service_text))
        

