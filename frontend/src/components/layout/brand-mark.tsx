/** 品牌标：强调色竖条 + 品牌名。Header（Link 内）与 Footer（p 内）共用，
 *  外层容器与文字样式由使用方决定。 */
export default function BrandMark({ name }: { name: string }) {
  return (
    <>
      <span aria-hidden="true" className="h-5 w-1 bg-accent" />
      {name}
    </>
  );
}
