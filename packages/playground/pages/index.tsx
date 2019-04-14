import * as React from "react";
import { NextStatelessComponent } from "next";
import Link from "next/link";
import {useInputField} from '@simple/react-from'
interface Props {
  posts: any[];
}

const BlogIndex: NextStatelessComponent<Props> = ({ posts }) => {
  const [firstName, onChange]: any[] = useInputField({validator: (val: string) => {
    return val.indexOf('awesome') !== -1
  }})
  return (
    <div>
      <h1>@simple/react-form Demo</h1>
      <input type="text" placeholder="Type deepak is awesome" value={firstName.input.value} onChange={onChange} onFocus={firstName.input.onFocus} />
      <div className={firstName.meta.valid ? 'green': 'red'}>
        Is Form valid?
      </div>
      <code className="code">
        Meta Data
        <br/>
        {
          JSON.stringify(firstName.meta, null, 4)
        }
      </code>
      
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link passHref href={`/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        input {
          font-size: 1.5em;
          width: 400px;
        }
        div.green {
          background: #5dc55d;
          padding: 4px 12px;
          margin: 12px 0;
          font-weight: 600;
        }
        div.red {
          background: #f52b2b;
          padding: 4px 12px;
          margin: 12px 0;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

BlogIndex.getInitialProps = async () => {
  const posts = [
    { id: 1, title: "10 great drinking games" },
    { id: 2, title: "3 amazing hangover antidotes!" }
  ];
  return { posts };
};

export default BlogIndex;