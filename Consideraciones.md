## State manager
* El state manager esta implementado con la ContextAPI en el modulo de product.
* Me enfoqué en la parte de manejo de estado y persistencia, tratando de no cambiar tanto los componentes que ya estaban creados.

## Mejoras
* Los componentes que "wrappean un elemento primitivo de html", como Button, para mi no deberían tener props que se llamen como los atributos primitivos, por ejemplo 'type'.
* El ProductForm component se podría wrapper en un NewProductForm y EditProductForm por ejemplo, así cada componente tiene una unica responsabilidad y podrian actuar de containers.
* Se podría mejorar un poco el Logged layout, usando elementos que den un poco más de significado, por ejemplo el sidebar podría ser un aside que tenga su header y su contenido, agregar un main a que tenga el contenido principal, el Header component que realmente use un header internamente, no solo usar clases css, sino aprovechar los los elementos con su significado.
* Sobre el código que está tal vez sería mejor manejar un estado interno en los forms y sólo al momento de guardar la entidad hacer dispatch de una acción al state.
