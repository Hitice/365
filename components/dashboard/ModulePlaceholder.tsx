import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/*
  Pagina padrao de modulo planejado: explica o que o modulo vai fazer
  (pra equipe ja entender o mapa do sistema) sem fingir funcionalidade.
*/
export default function ModulePlaceholder({
  titulo,
  descricao,
  recursos,
}: {
  titulo: string;
  descricao: string;
  recursos: string[];
}) {
  return (
    <div className="mx-auto max-w-2xl py-8">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">{titulo}</h1>
        <Badge variant="secondary">Em desenvolvimento</Badge>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{descricao}</p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">O que este módulo vai fazer</CardTitle>
          <CardDescription>Escopo planejado. Chega em uma das próximas etapas.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {recursos.map((r) => (
              <li key={r} className="flex gap-2">
                <span className="text-primary">•</span>
                {r}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
