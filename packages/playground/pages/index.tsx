import * as React from "react";
import { NextStatelessComponent } from "next";
import Link from "next/link";
import {useInputField} from '@simple/react-from'
interface Props {
  posts: any[];
}
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'

const BlogIndex: NextStatelessComponent<Props> = ({ posts }) => {
  const [openCode, setCodeBox] = React.useState(false)
  const scope = {JSON, useInputField};
  const code = `
  () =>  {
    const [firstName, onChange] = useInputField({validator: (val) => {
      return val.indexOf('awesome') !== -1
    }})
    return (<div><input type="text" placeholder="Type deepak is awesome" onChange={firstName.input.onChange} />
    <div className={firstName.meta.valid ? 'green': 'red'}> Is Form valid?</div>
    meta data:: { JSON.stringify(firstName.meta, null, 4)}
    </div>)
  }
`
  return (
    <div>
      <h1>@simple/react-form React Live Demo</h1>
      <LiveProvider code={code} scope={scope} className="live-preview">
        <LivePreview className="live-preview" />
        <button onClick={() => setCodeBox(!openCode)}>Toggle Code</button>
        {openCode && <LiveEditor />}
        <LiveError />
      </LiveProvider>
      
      <style global jsx>{`
        input {
          font-size: 1.5em;
          width: 400px;
        }
        textarea {
          background: #000 !important;
        }
        div {
          margin-bottom: 10px;
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